<template>
  <div @click="handleContainerClick" class="tag-container">
    <input
      v-model="inputValue"
      type="text"
      class="tag-input"
      @click="handleInputClick"
      placeholder="Add tags..."
      @input="handleInput"
      @keydown="handleInputKeyDown"
    />

    <Transition name="slide-fade">
      <div
        class="tag-suggestions"
        v-if="showSuggestions && suggestions.length > 0"
      >
        <div
          :class="[
            'tag-suggestions-item',
            { 'tag-suggestions__focus': activeItem == index },
          ]"
          v-for="(tag, index) in suggestions"
          :key="tag.id"
          @click="handleItemClick(tag)"
          @keydown="handleTagItemKeyDown($event, tag)"
        >
          {{ tag.label }}
        </div>
      </div>
    </Transition>

    <div class="tag-selected" v-if="value.length > 0">
      <span class="tag-selected-item" v-for="tag in value" :key="tag.id">
        {{ tag.label }}
      </span>
    </div>
  </div>
</template>

<script>
import { convertSpaceToDash } from "@/tools/index.js";
export default {
  data() {
    return {
      value: [],
      inputValue: "",
      showSuggestions: false,
      tags: [
        {
          id: "apple",
          label: "Apple",
        },
        {
          id: "gillette",
          label: "Gillette",
        },
        {
          id: "mastercard",
          label: "Mastercard",
        },
        {
          id: "the-walt-disney-company",
          label: "The Walt Disney Company",
        },
        {
          id: "facebook",
          label: "Facebook",
        },
        {
          id: "louis-vuitton",
          label: "Louis Vuitton",
        },
      ],

      suggestions: [
        {
          id: "apple",
          label: "Apple",
        },
        {
          id: "gillette",
          label: "Gillette",
        },
        {
          id: "mastercard",
          label: "Mastercard",
        },
        {
          id: "the-walt-disney-company",
          label: "The Walt Disney Company",
        },
        {
          id: "facebook",
          label: "Facebook",
        },
        {
          id: "louis-vuitton",
          label: "Louis Vuitton",
        },
      ],

      activeItem: 0,
    };
  },

  mounted() {
    window.onclick = () => {
      this.showSuggestions = false;
    };
  },

  methods: {
    addNewTag(value) {
      // if value is object directly will add to this.value
      if (typeof value == "object") {
        this.value.push(value);
      } else {
        // value is not object and should id should generate from value
        const newTag = {
          id: convertSpaceToDash(value),
          label: value,
        };
        this.value.push(newTag);
      }
      this.showSuggestions = false;
      this.inputValue = "";
      this.suggestions = this.tags;
    },

    handleContainerClick(e) {
      e.stopPropagation();
    },

    handleInput(event) {
      this.showSuggestions = true;
      const value = event.target.value;

      // filtering suggestion according to input value
      this.suggestions = this.tags.filter((tag) => {
        return tag.label.includes(value);
      });

      // adding new tag with comma(,) key in input
      // or we can use keydown event with (,) keycode
      if (value.includes(",")) {
        const splitedValue = value.split(",");
        this.addNewTag(splitedValue[0]);
      }
    },

    // NOTE: I changed input focus to click for better performance
    // like when user adding new tag from suggestions with enter key,
    // suggestions section will close for see the result of the adding tag
    handleInputClick() {
      this.showSuggestions = !this.showSuggestions;
    },

    handleItemClick(tag) {
      this.showSuggestions = false;
      this.addNewTag(tag);
    },

    handleInputKeyDown(event) {
      //On input arrow down
      if (
        event.keyCode == 40 &&
        this.activeItem + 1 < this.suggestions.length
      ) {
        this.activeItem++;
      }
      //   On input arrow up
      else if (event.keyCode == 38 && this.activeItem > 0) {
        this.activeItem--;
      }
      //   On input enter, active suggestion should add to values array
      else if (event.keyCode == 13) {
        if (this.suggestions[this.activeItem])
          this.addNewTag(this.suggestions[this.activeItem]);
        else {
          this.addNewTag(this.inputValue);
        }
      }
      // On input escape will close suggestions
      else if (event.keyCode == 27) {
        this.showSuggestions = false;
      }
    },
  },
};
</script>

<style src="./style.scss" lang="scss" />
