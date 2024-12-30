<template>
  <div class="loader" v-if="visible">
    <div class="spinner"></div>
    <p v-if="message" class="loader-message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loader-message {
  color: white;
  margin-top: 10px;
  font-size: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
