import { useEffect } from "react"

export default function Selection({ selection }) {
    let countryList
    useEffect(() => {
        countryList = selection.map((feature, count) => {
            return (
                <li key={`country ${count}`}>
                    {feature.values_.name}
                </li>
            )
        })
    }, [selection])
    return (
        <>
            <ol>{countryList}</ol>
        </>
    )
}