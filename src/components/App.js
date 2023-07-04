import '../styles/App.scss';
import {useEffect, useState} from 'react';
function App() {
  const [friendsData, setFriendsData] = useState([]);
  const [search , setSearch] = useState('');
  const [select , setSelect] = useState ('');
  const [newQuote, setNewQuote] =useState({
    quote:'',
    character:''
  })
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
  const handleAddNewQuote =(ev)=>{
    setNewQuote({...newQuote,
      [ev.target.id] : ev.target.value})
    }
    
    const handleAddNewQuoteBtn =()=>{
      console.log('newQuote: ', newQuote)
     setFriendsData([...friendsData, newQuote])
     setNewQuote({ friendsData: '', character: '' });
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
        phraseCharacter === select || phraseCharacter.includes(select)
      )
    });
    return filter.map((eachPhrase , index)=>{
      return <li key={index} className='phrase'>
      <span className='phrase__text'>{eachPhrase.quote}</span>
      <span className='phrase__line'> - </span>
      <span className='phrase__author'>{eachPhrase.character}</span>
      </li>
    });
  }
  useEffect(() => {
    fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
      .then((response) => response.json())
      .then((data) => {
        setFriendsData(data);
      });
  }, []);
  return (
    <div className='page'>
      <header className='header'>
        <h1 className='header__title'>Frases de Friends</h1>
      </header>
      <main className='main'>
        <form className='main__form'>
          <label htmlFor='phrase'>
            <input htmlFor='phrase' placeholder='Filtrar por frase' className='main__form--input' type='text' onChange={handleSearch}></input>
          </label>
          <label htmlFor='author'>
            <select htmlFor='author' className='main__form--select' onChange={handleSelect}>
              <option value="">Todos</option>
              <option value="Ross">Ross</option>
              <option value="Mónica">Mónica</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Chadler">Chadler</option>
              <option value="Rachel">Rachel</option>
            </select>
          </label>
        </form>
        <ul className='main__list'>
          {renderPhrase()}
        </ul>
        <section className='addQuote'>
            <h2 className='addQuote__title'>Añadir una frase nueva</h2>
            <div className='addQuote__form'>
              <label className='addQuote__form--label'>
                Frase
                <input
                  className='addQuote__form--selectQuote'
                  type='text'
                  name='quote'
                  id='quote'
                  value={newQuote.quote}
                  onChange={handleAddNewQuote}
                />
              </label>
                <label className='addQuote__form--label'>
                  Personaje
                  <input
                    className='addQuote__form--selectCharacter'
                    type='text'
                    name='character'
                    id='character'
                    value={newQuote.character}
                    onChange={handleAddNewQuote}
                  />
                </label>
                <input
                  className='btn__addQuote'
                  type='button'
                  value='Añadir'
                  onClick={handleAddNewQuoteBtn}
                />
              
            </div>
          </section>
      </main>
    </div>
  );
}

export default App;
