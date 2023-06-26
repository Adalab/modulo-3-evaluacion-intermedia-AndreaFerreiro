import '../styles/App.scss';
import {useEffect, useState} from 'react';
function App() {
  const [friendsData, setFriendsData] = useState([]);
  const [search , setSearch] = useState('');
  const [select , setSelect] = useState ('');
  const handleSearch = (ev) => {
    ev.preventDefault();
    const searchValue = ev.target.value.toLowerCase();
    setSearch(searchValue);
  }
  const handleSelect = (ev) => {
    ev.preventDefault();
    const selectedCharacter = ev.target.value.toLowerCase();
    setSelect (selectedCharacter);
  }
  const renderPhrase = () => {
    const filter = friendsData.filter ( (eachPhrase) => {
      const phraseText = eachPhrase.quote.toLowerCase();
      return (
        phraseText.includes(search)
      )
    }).filter ((eachPhrase) => {
      const phraseCharacter = eachPhrase.character.toLowerCase();
      return (
        phraseCharacter === select
      )
    });
    return filter.map((eachPhrase , index)=>{
      return <li key={index} className='phrase'>
      <p className='phrase__text'>{eachPhrase.quote}</p>
      <p className='phrase__line'> - </p>
      <p className='phrase__author'>{eachPhrase.character}</p>
      </li>
    });
  }
  useEffect(() => {
    fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFriendsData(data);
      });
  }, []);
  return (
    <div>
      <header className='header'>
        <h1 className='header__title'>Frases de Friends</h1>
      </header>
      <main className='main'>
        <form className='main__form'>
          <label>
            <input className='main__form--input' type='text' onChange={handleSearch}></input>
          </label>
          <label>
            <select className='main__form--select'>
              <option>Todos</option>
              <option>Ross</option>
              <option>Mónica</option>
              <option>Joey</option>
              <option>Phoebe</option>
              <option>Chadler</option>
              <option>Rachel</option>
            </select>
          </label>
        </form>
        <ul className='main__list'>
          {renderPhrase()}
        </ul>
      </main>
    </div>
  );
}

export default App;
