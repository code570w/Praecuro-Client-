import React from "react";
import './BreadCrumb.scss';
import logo from '../../assets/logo1.png';
class BreadCrumb extends React.Component {
  componentDidMount() {
    //   console.log('---------  BreadCrumb ---------')
    //   console.log(this.props.title);
  }
  render() {
    return (
        <section className="apus-breadscrumb">
            <div className="container">
                <div className="wrapper-breads">
                    <div className="left-inner">
                        {/* <ol className="breadcrumb">
                            <li><a href="#">{this.props.base}</a>  </li> 
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><span className="active">{this.props.title}</span></li>
                        </ol> */}
                    </div>
                    <div className="breadscrumb-inner clearfix">
                        <h2 className="bread-title">{this.props.title}</h2>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}


export default BreadCrumb;
