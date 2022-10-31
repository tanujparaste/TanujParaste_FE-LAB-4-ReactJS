import { useEffect, useState } from "react"
import IDataList from "../model/IDataList"
import { getDataFromServer } from '../services/menu'
import ExpenseTracker from "./ExpenseTracker"

function ShowData() {
    const [items, setItems] = useState<IDataList[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [showform, setShowForm] = useState<boolean>(false)

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getDataFromServer();
                setItems(data);
            }
            catch (error: any) {
                setError(error)
            }
        }
        fetchMenu();
    }, []);

    let sum: number = 0;
    let rahulspent: number = 0;
    let rameshspent: number = 0;

    const shares = (data: IDataList[]) => {
        data.map(
            sams => (
                sams.payeeName === "Rahul" ? (
                    rahulspent = rahulspent + sams.price
                ) :
                    (
                        rameshspent = rameshspent + sams.price
                    )
            )
        )
    }

    sum = items.reduce((result, v) => result = result + v.price, 0);
    shares(items);

    const success = async () => {
        setShowForm(false);
        try {
            const data = await getDataFromServer();
            setItems(data);
        }
        catch (error: any) {
            setError(error)
        }
    }

    const cancel = () => {
        setShowForm(false);
    }

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {
                showform && (
                    <div className="form">
                        <ExpenseTracker onTrue={success} onClose={cancel} />
                    </div>
                )
            }
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
            </>
            {
                items && (
                    items.map(
                        (user, idx) => (
                            <div key={idx}>
                                <div className="use-inline date">{user.setDate}</div>
                                <div className="use-inline">{user.product}</div>
                                <div className="use-inline price">{user.price}</div>
                                <div className={`use-inline ${user.payeeName}`}>{user.payeeName}</div>
                            </div>
                        )
                    )
                )
            }
            <hr />

            <div className="use-inline ">Total: </div>
            <span className="use-inline total">{sum}</span> <br />
            <div className="use-inline ">Rahul paid: </div>
            <span className="use-inline total Rahul">{rahulspent}</span> <br />
            <div className="use-inline ">Ramesh paid: </div>
            <span className="use-inline total Ramesh">{rameshspent}</span> <br />
            <span className="use-inline payable">{rahulspent > rameshspent ? "Pay Rahul " : "Pay Ramesh"}</span>
            <span className="use-inline payable price"> {Math.abs(rahulspent - rameshspent)}</span>

            {
                error && (
                    <>
                        {error?.message}
                    </>
                )
            }
        </>
    )
}
export default ShowData;