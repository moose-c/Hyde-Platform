

/**
 * The `Attributions` function returns a React component that displays attribution information for the
 * tiles used in a map, specifically from ArcGIS.
 */
import React from "react"

export default function Attributions() {
    return (
        <>
            <div style={{ backgroundColor: "white" }}>
                Tiles @ <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a><br />
            </div>
        </>
    )
}