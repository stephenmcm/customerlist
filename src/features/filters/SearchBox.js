import React from "react";
import { connect } from "react-redux";
import { setSearchStringFilter } from "./filtersSlice";
import PropTypes from "prop-types";
import fStyles from "../../components/FormControl.module.scss";

const SearchInput = ({ setSearchStringFilter, searchString }) => (
  <div className={fStyles.FormControl}>
    <input
      className="valid"
      data-testid="input-search"
      name="search"
      id="search"
      placeholder="Search"
      // @TODO debounce this
      onChange={(e) => setSearchStringFilter(e.target.value)}
      value={searchString}
    ></input>
  </div>
);

SearchInput.propTypes = {
  setSearchStringFilter: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  searchString: state.visibilityFilter.searchString,
});

const mapDispatchToProps = { setSearchStringFilter };

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
