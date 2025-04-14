<script setup lang="ts">
definePageMeta({
  layout: "logged-in",
  middleware: ["user-authenticated-redirect"],
});
const { user } = useUserStore();
</script>
<template>
  <provet-banner variant="warning"
    >Please verify your email. Verification link is sent to your
    inbox.</provet-banner
  >
  <div data-testid="success-page" class="success-page">
    <h1>Welcome!</h1>
    <p v-if="user.subscribeToUpdates">
      Thanks for signing up. You’ll hear from us soon with exciting updates and
      product news!
    </p>
    <p v-else="user.subscribeToUpdates">
      Thanks for signing up. If you want to receive our updates and
      announcements, please subscribe in your
      <NuxtLink to="/">profile settings</NuxtLink>
    </p>
    <h2>Explore</h2>
    <div class="explore-grid">
      <provet-card
        ><provet-stack class="n-items-center n-padding-b-xl"
          ><provet-icon name="generic-pet-paw" size="xxl"></provet-icon
        ></provet-stack>
        <provet-divider></provet-divider>
        <div slot="footer">Patients</div>
      </provet-card>
      <provet-card
        ><provet-stack class="n-items-center n-padding-b-xl"
          ><provet-icon name="graph-line" size="xxl"></provet-icon
        ></provet-stack>
        <provet-divider></provet-divider>
        <div slot="footer">Reports</div>
      </provet-card>
      <provet-card
        ><provet-stack class="n-items-center n-padding-b-xl"
          ><provet-icon name="navigation-finances" size="xxl"></provet-icon
        ></provet-stack>
        <provet-divider></provet-divider>
        <div slot="footer">Finances</div>
      </provet-card>
      <provet-card
        ><provet-stack class="n-items-center n-padding-b-xl"
          ><provet-icon name="interface-calendar" size="xxl"></provet-icon
        ></provet-stack>
        <provet-divider></provet-divider>
        <div slot="footer">Calendar</div>
      </provet-card>
    </div>
  </div>
</template>
<style scoped>
.success-page {
  max-width: 920px;
  margin: auto;
  width: 100%;
}
.explore-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
}
@media (min-width: 768px) {
  .explore-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
