import './SearchInput.scss';
import SmalSubmitButton from '../main-components/SmallSubmitButton';

const SearchInput = () => {
  return (
    <div className="search__input-wrapper">
    <input placeholder='Search...' type="text" className="search__input" />
    <SmalSubmitButton text='Search'/>
    </div>
  )
}

export default SearchInput