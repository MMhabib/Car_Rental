import Banner from "../components/Banner";
import FeaturedSection from "../components/FeaturedSection";
import Hero from "../components/Hero";
import Newsteller from "../components/Newsteller";
import Testimonial from "../components/Testimonial";


const Home = () => {
    return (
        <div>
            <Hero/>
            <FeaturedSection/>
            <Banner/>
            <Testimonial/>
            <Newsteller/>
        </div>
    );
};

export default Home;