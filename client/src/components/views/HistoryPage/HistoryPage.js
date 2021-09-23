import React from 'react'
import { dateFormat } from '../../ParseData'

function HistoryPage(props) {

    // const [History, setHistory] = useState([])

    // useEffect(() => {

    //     axios.get('/api/users/history')
    //     .then(response => {
    //         if (response.data.success) {

    //         } else {
    //             alert('히스토리 정보를 가져오는데 실패했습니다.');
    //         }
    //     })

    // }, [])

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>

                <tbody>

                    {props.user.userData && props.user.userData.history &&
                        props.user.userData.history.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{dateFormat(item.dateOfPurchase, "YYYY-MM-DD")}</td>
                            </tr>
                        ))}


                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage
