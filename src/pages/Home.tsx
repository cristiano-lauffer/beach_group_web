import Header from "../components/Header"
import SecaoCards from "../components/../components/homeComponents/HomeSecaoCards"
import SecaoCoach from "../components/../components/homeComponents/HomeSecaoCoach"
import SecaoTexto from "../components/../components/homeComponents/HomeSecaoTexto"
import Footer from "../components/Footer"
import HomeSecaoCarouselImagens from "../components/../components/homeComponents/HomeSecaoCarouselImagens"

const Home = () => {
    return (
        <div>
            <Header />
            <SecaoTexto />
            <SecaoCards />
            <SecaoCoach />
            <HomeSecaoCarouselImagens />
            <Footer />
        </div>
    )
}

export default Home