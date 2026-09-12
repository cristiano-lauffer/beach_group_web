import Header from "../components/Header"
import SecaoCards from "../components/HomeSecaoCards"
import SecaoCoach from "../components/HomeSecaoCoach"
import SecaoTexto from "../components/HomeSecaoTexto"
import Footer from "../components/Footer"
import HomeSecaoCarouselImagens from "../components/HomeSecaoCarouselImagens"

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