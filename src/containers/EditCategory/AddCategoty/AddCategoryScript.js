export default {
    data() {
      return {
        newCategory: "",
        colorsArray: [
          "#ff8c66",
          "#ffb366",
          "#ffd966",
          "#ffff66",
          "#d9ff66",
          "#b3ff66",
          "#8cff66",
          "#66ff66",
          "#66ff8c",
          "#66ffb3",
          "#66ffd9",
          "#66ffff",
          "#66d9ff",
          "#66b3ff",
          "#668cff",
          "#6666ff",
          "#8c66ff",
          "#b366ff",
          "#d966ff",
          "#8a3f65",
          "#ff66ff",
          "#ff66d9",
          "#ff66b3",
          "#ff668c",
          "#ff6666"
        ],
        selectedColor: "",
        errorMsg: ""
      };
    },
    methods: {
      addCategory() {
        if (this.newCategory !== "" && this.selectedColor !== "") {
          this.$store.dispatch("addNewCategory", {
            category: this.newCategory,
            color: this.selectedColor
          });
          this.$emit("close-add-cat");
        } else {
          this.errorMsg = "Name and color are required";
        }
      }
    }
  };