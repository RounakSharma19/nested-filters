import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  addSelectedFilter,
  removeSelectedFilter,
  setIsDropdownOpen,
  setCurrentCategory,
  setFilterPillActive,
  clearSelectedFilters,
  applySelectedFilters,
} from "../../store/filtersSlice";
import { RootState } from "../../store/rootReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCubes,
  faUser,
  faGraduationCap,
  faTags,
  faChevronLeft,
  faTimes,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Render } from "../Render";
import { mockFetchFilters } from "../../utils";
import { nestedFilters } from "../../lang/nestedFilters.lang";
import "./NestedFilter.css";
import SearchBar from "../SearchBar";
import { TFilterCategory, TFilterOption } from "../../interfaces";

const categoryIcons: { [key: string]: IconDefinition } = {
  Collection: faCubes,
  "Created by": faUser,
  Academy: faGraduationCap,
  "Content tags": faTags,
};

export const NestedFilter = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const [applyButtonClicked, setApplyButtonClicked] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters.filters);
  const selectedFilters = useSelector(
    (state: RootState) => state.filters.selectedFilters
  );
  const isDropdownOpen = useSelector(
    (state: RootState) => state.filters.isDropdownOpen
  );
  const currentCategory = useSelector(
    (state: RootState) => state.filters.currentCategory
  );
  const filterPillActive = useSelector(
    (state: RootState) => state.filters.filterPillActive
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const useMessage = nestedFilters;
  const localized = {
    addFilter: useMessage.addFilter,
    searchPlaceholder: useMessage.searchPlaceholder,
  };

  useEffect(() => {
    const fetchFilters = async () => {
      const data = await mockFetchFilters();
      dispatch(setFilters(data));
    };

    fetchFilters();
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearSelectedFilters());
    setApplyButtonClicked(false);
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dispatch(setIsDropdownOpen(false));
        dispatch(setCurrentCategory(null));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleAddFilterClick = () => {
    dispatch(setIsDropdownOpen(!isDropdownOpen));
    dispatch(setCurrentCategory(null));
    dispatch(setFilterPillActive(!filterPillActive));
  };

  const handleCategoryClick = (category: TFilterCategory) => {
    dispatch(setCurrentCategory(category));
    dispatch(setIsDropdownOpen(false));
  };

  const handleOptionClick = (category: string, option: TFilterOption) => {
    const isOptionAlreadySelected = isOptionSelected(category, option.id);

    if (!isOptionAlreadySelected) {
      dispatch(addSelectedFilter({ category, option }));
    }
  };

  const toggleAddFilterUI = () => {
    dispatch(setIsDropdownOpen(!isDropdownOpen));
    dispatch(setCurrentCategory(null));
  };

  const handleClearClick = () => {
    dispatch(clearSelectedFilters());
    setApplyButtonClicked(false);
  };

  const handleApplyClick = () => {
    dispatch(applySelectedFilters());
    setApplyButtonClicked(true);
  };

  const handleRemoveFilterClick = (category: string, optionId: number) => {
    dispatch(removeSelectedFilter({ category, optionId }));
  };

  const filteredOptions = currentCategory?.options.filter((option) =>
    option.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const isOptionSelected = (category: string, optionId: number) => {
    return selectedFilters[category]?.some((o) => o.id === optionId) || false;
  };

  const renderFilterOptions = () => {
    if (!currentCategory || !filteredOptions) return null;

    const selectedOptions = filteredOptions.filter((option) =>
      isOptionSelected(currentCategory.name, option.id)
    );

    return (
      <>
        {selectedOptions.length > 0 && (
          <>
            <div className="filter-section-header">
              SELECTED {selectedOptions.length}
            </div>
            {selectedOptions.map((option) => renderFilterOption(option, true))}
          </>
        )}
        <div className="filter-section-header">ALL</div>
        {filteredOptions.map((option) =>
          renderFilterOption(
            option,
            isOptionSelected(currentCategory.name, option.id)
          )
        )}
      </>
    );
  };

  const renderFilterOption = (option: TFilterOption, isSelected: boolean) => (
    <label
      key={option.id}
      className={`filter-option ${isSelected ? "selected" : ""}`}
    >
      <div className="option-content">
        <img
          src={option.avatar || currentCategory?.dummyIcon}
          alt={option.name}
          className="option-avatar"
        />
        {option.name}
      </div>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleOptionClick(currentCategory!.name, option)}
        className="option-checkbox"
      />
    </label>
  );

  return (
    <div className="nested-filter-container">
      <div className="nested-filter" ref={dropdownRef}>
        <div
          className={`filter-pill ${filterPillActive ? "active" : ""}`}
          onClick={handleAddFilterClick}
        >
          + {localized.addFilter}
        </div>
        <div className="selected-filters">
          {applyButtonClicked &&
            Object.entries(selectedFilters)?.map(([category, options]) =>
              options.map((option) => (
                <div
                  key={`${category}-${option.id}`}
                  className="selected-filter"
                >
                  {category} is {option.name}{" "}
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="remove-icon"
                    onClick={() => handleRemoveFilterClick(category, option.id)}
                  />
                </div>
              ))
            )}
        </div>
        <Render if={isDropdownOpen}>
          <div className={`filter-dropdown ${isDropdownOpen ? "open" : ""}`}>
            <div className="filter-heading">Add Filter</div>
            {filters.map((category) => (
              <div key={category.id} className="filter-category-wrapper">
                <label
                  className="filter-category"
                  onClick={() => handleCategoryClick(category)}
                >
                  <FontAwesomeIcon
                    icon={
                      categoryIcons[category.name as keyof typeof categoryIcons]
                    }
                    className="filter-icon"
                  />
                  <span className="filter-name">{category.name}</span>
                </label>
              </div>
            ))}
          </div>
        </Render>
        <Render if={currentCategory !== null}>
          <div className={`filter-options ${currentCategory ? "open" : ""}`}>
            <div className="filter-heading">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="toggle-filter-ui"
                onClick={toggleAddFilterUI}
              />
              {currentCategory?.name}
            </div>

            <SearchBar
              placeholder={localized.searchPlaceholder}
              onChange={(value) => setSearchValue(value)}
              onCancel={() => setSearchValue("")}
            />
            {renderFilterOptions()}
            <div className="filter-actions">
              <button className="clear-button" onClick={handleClearClick}>
                Clear
              </button>
              <button className="apply-button" onClick={handleApplyClick}>
                Apply
              </button>
            </div>
          </div>
        </Render>
      </div>
    </div>
  );
};
