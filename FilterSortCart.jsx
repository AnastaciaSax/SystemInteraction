import React from "react";

function FilterSortCart({
  currentPlace,
  setCurrentPlace,
  currentSort,
  setCurrentSort,
  currentSearch,
  setCurrentSearch,
  onAddService,
}) {
  const filterButtons = [
    { place: "Bathroom", label: "bathroom" },
    { place: "Bedroom", label: "bedroom" },
    { place: "Kitchen", label: "kitchen" },
    { place: "Living Room", label: "livingRoom" },
    { place: "Dining Hall", label: "diningHall" },
  ];

  return (
    <div className="project">
      <div className="filt">
        <div className="filt-content">
          {filterButtons.map((btn) => (
            <button
              key={btn.place}
              data-place={btn.place}
              data-i18n={btn.label}
              className={currentPlace === btn.place ? "active" : ""}
              onClick={() =>
                setCurrentPlace(currentPlace === btn.place ? null : btn.place)
              }
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <div className="search">
          <img
            src="/Assets/catalogSearch.svg"
            alt="magnifying glass"
            data-i18n-alt="searchIcon"
          />
          <div className="search-input">
            <input
              type="text"
              placeholder=""
              data-i18n-placeholder="searchPlaceholder"
              value={currentSearch}
              onChange={(e) => setCurrentSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="sort">
          <select
            id="sort"
            name="sort"
            className="sort-select"
            value={currentSort || ""}
            onChange={(e) => setCurrentSort(e.target.value || null)}
          >
            <option value="" data-i18n="sortBy">
              Sort by
            </option>
            <option value="price" data-i18n="sortByPrice">
              By price
            </option>
            <option value="title" data-i18n="sortByTitle">
              By title
            </option>
            <option value="category" data-i18n="sortByCategory">
              By category
            </option>
          </select>
          <img
            src="/Assets/catalogSort.svg"
            alt="Sort Arrow"
            className="select-arrow"
            data-i18n-alt="sortIcon"
          />
        </div>

       <div className="cart-butt">
    <button onClick={onAddService}>+ New Service</button>
  </div>
      </div>
    </div>
  );
}

export default FilterSortCart;