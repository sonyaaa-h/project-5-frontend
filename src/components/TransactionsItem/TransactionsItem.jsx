const TransactionsItem = ({ date, type, category, comment, sum }) => {
    return (
        <div>
            <ul>
                <li>{date}</li>
                <li>{type}</li>
                <li>{category}</li>
                <li>{comment}</li>
                <li>{sum}</li>
            </ul>
        </div>
    );
};
export default TransactionsItem;
