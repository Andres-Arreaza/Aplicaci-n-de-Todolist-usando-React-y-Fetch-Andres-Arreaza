import React from "react";
import Todolist from "./Todolist.jsx";
import { Footer } from '../component/footer.jsx';

const Home = () => {
    return (
        <div>
			<div className="container">
				<Todolist />
				<Footer />
			</div>
        </div>
    );
};

export default Home;
