import React, { useEffect, useState } from 'react'
// import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Layout, Menu, Select, Input, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { continents, price } from './Sections/Datas';
import { numberWithComma } from '../../ParseData';

const { Content, Footer, Sider } = Layout;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => {
        axios.post(`${process.env.REACT_APP_PRODUCT_SERVER}products`, body)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                }
            })
    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }

        getProducts(body)
        setSkip(skip)
    }


    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}
                // cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${numberWithComma(product.price)}`}
                />
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)

    }
    
    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters
        // 아이디 값
        console.log('filters', filters)

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)

    }



    return (
        <Layout>
            <Content className="layout-content">
            <Layout className="site-layout-background">
                <Sider className="site-layout-background" width={300}>
                    <Menu
                        mode="inline"
                        style={{ height: "100%",marginTop: 16 }}
                        >
                        <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                        <Checkbox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                            <SearchFeature
                                refreshFunction={updateSearchTerm}
                                />
                        </div>
                        {/* <SubMenu key="priceMenu" icon={<DollarTwoTone />} title="Price">
                            <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                        </SubMenu> */}

                    </Menu>
                </Sider>
                <Content className="content-list">
                    <div style={{ textAlign: 'center' }}>
                        <h2>Let's Travel Anywhere </h2>
                    </div>

                    <Row gutter={[16, 16]} >
                        {renderCards}
                    </Row>

                    <br />

                    {PostSize >= Limit &&
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button onClick={loadMoreHandler}>더보기</button>
                        </div>
                    }

                </Content>
    
              {/* //todo more list button 넣어야함 */}
            </Layout>
            </Content>
            <Footer className="footer-team-name">Team Diary</Footer>
        </Layout>
    );
}
    

export default LandingPage
