// Requiring react npm Package.
var React = require("react");
// var Search = require("./search");
import { Footer } from "./Footer";
import { Header } from "./Header";

// Create a new class and assign it in a variable Main.
class Main extends React.Component{
    render(){
        return(
            <div>
                <Header />
                {/*<div clasesName="main-content">*/}
                    {this.props.children}
                {/*</div>*/}
                <Footer />
            </div>

        );
    }
}

export {Main};  
// {class1,class2}