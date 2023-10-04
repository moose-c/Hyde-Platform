import '../styles/Page.css'

import LeftElements from './left/LeftElements'
import MiddleElements from './middle/MiddleElements'
import RightElements from './right/RightElements'

import GridLayout from 'react-grid-layout'

export default function Page({selection, overlay, onOverlay}) {
    const layout = [
        { i: "a", x: 0, y: 10, w: 1, h: 2, static: false },
        { i: "b", x: 1, y: 0, w: 3, h: 2, static: false },
        { i: "c", x: 4, y: 0, w: 1, h: 2, static: false }
    ];
    return (
        <GridLayout
            className="layout"
            layout={layout}
            autoSize={true}
            cols={12}
            rowHeight={10}
            width={1200}
        >
            <div className="left" key="a" style={{border: '2px solid black'}}><LeftElements selection={selection}/></div>
            <div className="middle" key="b" style={{border: '2px solid black'}}><MiddleElements /></div>
            <div className="right" key="c" style={{border: '2px solid black'}}><RightElements /></div>
        </GridLayout>
    )
}