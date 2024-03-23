import React, { useState } from "react";
import { tagsList } from "../../utils/utils";
import styles from "./write.module.css";

/**
 * Component for setting tags for post and display suggestions
 * @param {*} param0 
 * @returns 
 */
function TagsInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  /**
   * Handles the change in input value
   * @param {*} event 
   */
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter suggestions based on input value
    if (value) {
        // Filter suggestions based on input value
        const matchingTags = tagsList.filter((tag) =>
          tag.toLowerCase().includes(value.toLowerCase())
        );
        // Limit suggestions to 5
        setSuggestions(matchingTags.slice(0, 5));
      } else {
        setSuggestions([]); 
      }
  };

  /**
   * Handles key press for entering the custom tag
   * @param {*} event 
   */
  const handleInputKeyDown = (event) => {
    if (tags.length < 5) {
      if (event.key === "Enter") {
        const tag = inputValue.trim();
        if (tag && !tags.includes(tag)) {
          setTags([...tags, tag]);
          setInputValue("");
          setSuggestions([]);
        }
      }
    }
  };

  /**
   * Handles the remove of tag when X is clicked
   * @param {*} tagToRemove 
   */
  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  /**
   * Display suggested predefined tags
   * @param {*} tag 
   */
  const handleSuggestionClick = (tag) => {
    if (tags.length < 5) {
      setTags([...tags, tag]);
      setInputValue("");
      setSuggestions([]); // Clear suggestions
    }
  };

  return (
    <div className={styles.tagsContainer}>
      <div className={styles.selectedTags}>
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <span className={styles.tagRemove} onClick={() => handleTagRemove(tag)}>
              X
            </span>
          </span>
        ))}
      </div>
      
      <div className={styles.suggestionContainer}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Enter max 5 tags"
      />
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((tag, index) => (
              <li key={index} onClick={() => handleSuggestionClick(tag)}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TagsInput;
