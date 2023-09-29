import LeftElements from './left/LeftElements'
import MiddleElements from './middle/MiddleElements'
import RightElements from './right/RightElements'

import GridLayout from 'react-grid-layout'

export default function Page() {
    const layout = [
        { i: "a", x: 0, y: 10, w: 1, h: 2, static: true },
        { i: "b", x: 1, y: 0, w: 3, h: 2, static: true },
        { i: "c", x: 4, y: 0, w: 1, h: 2, static: true }
    ];
    return (
        <GridLayout
            className="layout"
            layout={layout}
            autoSize={true}
            isDraggable={false}
            isResizable={false}
            cols={12}
            rowHeight={10}
            width={1200}
        >
            <div key="a" style={{border: '2px solid black'}}><LeftElements /></div>
            <div key="b" style={{border: '2px solid black'}}><MiddleElements /></div>
            <div key="c" style={{border: '2px solid black'}}><RightElements /></div>
        </GridLayout>
    )
}
