import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import Photo from './components/ListPhoto';
import UIForm from './components/CustomForm';

export default class App extends Component {
    render() {

        return (
            <div className="App">
                <Router>
                    <HeaderComponent />                    
                    <div className="container">
                        <Routes>
                            <Route path="/" exact element={<Photo />}/>
                            <Route path="/albums" element={<Photo />}/>
                            <Route path='/form' element={<UIForm />}/>
                        </Routes>
                    </div>                    
                    <FooterComponent />
                </Router>
            </div>
        );
    }
}
