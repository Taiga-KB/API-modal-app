import './App.css';
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import logo from "./images/MHW-logo.png"
import thing from "./images/MHW-thing.png"
import lunastra from "./images/MHW-lunastra.png"
import teostra from "./images/MHW-teostra.png"

// Modal.setAppElement("#root")
// ^ I do not like this

// This whole thing looks untidy and I don't like looking at it
function App() {

  // STATES
  const [monsterData, setMonsterData] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)

  const [modalIsOpen, setIsOpen] = useState(false)
  const [monsterInfo, setMonsterInfo] = useState({})

  // DATA FETCH & ERROR CATCH
  useEffect(() => {
    console.log("App has run test");

    const FetchData = async() => { 
      try {
        const response = await fetch("https://mhw-db.com/monsters")
      if (!response.ok) {
        throw new Error(response.status)
      }
      const data = await response.json()
      setMonsterData(data.splice(36, 9))
      } catch(error) {
        setErrorMsg("Something went wrong good luck finding out what that is")
        console.log(error)
      }
    }
    FetchData()
  }, [])

  // MODAL FUNCTIONS
  const openModal = (newInfo) => {
    setIsOpen(true)
    setMonsterInfo(newInfo)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  // SCREAMING
  return (  
    <div className="App">
      <img id="logo"src={logo} alt="logo"></img>
      {errorMsg !== null && <h3>{errorMsg}</h3>}

    <MonBox>
        {monsterData.map((monster, index) => {
          return (
            <MonCard onClick={() => openModal(monster)} key={index}>
              <img src={thing} alt="icon"></img>
              <h3>{monster.name}</h3>
            </MonCard> 
          )
        })}
      </MonBox>

      {modalIsOpen && (
        <ModalBox>
          <h3>{monsterInfo.name}</h3>
          <h4>Species: {monsterInfo.species}</h4>
          <p>{monsterInfo.description}</p>
          <Button onClick={closeModal}>X</Button>
        </ModalBox>
      )}

    </div>
  );
}
export default App;

// STYLED COMPONENTS
const Button = styled.button `
  width: fit-content;
  font-size: 20px;
  background-image: linear-gradient(43deg, #646b8b 0%, #7fb193 46%, #41413a 100%);
  opacity: .8;
  border-radius: 5px;

  &:hover {
    color: white;
    transition: .2s;

  }

`;

const MonCard = styled.div `
  background-color: #285862;
  background-image: linear-gradient(0deg, #285862 41%, #458973 100%);  
  border: 5px;
  border-style: solid;
  border-color: rgba(42, 110, 112, 0.507);
  border-radius: 10px;
  padding: 5px;
  opacity: .75;

  &:hover {
    border: 5px;
    border-style: solid;
    border-radius: 10px;
    border-color: rgb(0, 0, 0);
    box-shadow: 0 0 30px inset #000000;
    transition: .2s;
  }

`;

const MonBox = styled.div `
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10px;
  padding: 40px;

`;

const ModalBox = styled.div `
  position: absolute;
  background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
  width: 400px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
`