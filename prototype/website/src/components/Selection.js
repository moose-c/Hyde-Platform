export default function Selection({ selection }) {
    let [countryList, setCountryList] = useState([])
    useEffect(() => {
        setCountryList(selection.map((feature, count) => {
            return (
                <ListGroup.Item key={`country ${count}`}>
                    {feature.values_.name}
                </ListGroup.Item>
            )
        }))
    }, [selection])
    return (
        <>
            <ListGroup variant="flush" style={{ display: 'inline' }}>{countryList}</ListGroup>
        </>
    )
}
