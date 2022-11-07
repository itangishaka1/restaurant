import  dbConnect from '../../../util/mongo'
import Order from '../../../models/Order'

const handler = async (req, res) => {
    const { method, query: {id} } = req

    dbConnect()

    if(method === 'GET'){
        try {
            const order = await Order.findById(id)
            res.status(200).json(order)
        } catch (error) {
            console.log(error);
        }
    }
    if(method === 'PUT'){}
    if(method === 'DELETE'){}
}

export default handler