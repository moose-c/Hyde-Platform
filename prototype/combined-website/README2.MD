For this entire application, follow [react docs](https://create-react-app.dev/docs/getting-started)

Created using:
npm init react-app combined-website

main: entry point for this package, loaded if user would do require("combined-website")

Only files inside src are processed by webpack (application builder), which is utilized by react-scripts, so this should contain everything necessary for the application

Only files inside public can be used by public/index.html

Follow [react tutorial](https://react.dev/learn/tutorial-tic-tac-toe#setup-for-the-tutorial).
Component: reusable piece of code that is part of UI.

JSX element: javascript+html

fragment: <> </>, used to wrap multiple JXS elements

props: add value to component. JS within JSX: wrap in {}

state: components remember things

key: instead of recreating, check if the same key than reuse that component, used to uniquely identify components