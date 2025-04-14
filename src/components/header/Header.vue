<script lang="ts" setup>
import Button from "../globals/Button.vue";

const { user, logout } = useUserStore();
</script>
<template>
  <provet-top-bar slot="top-bar">
    <provet-dropdown slot="end" v-if="user.subscribeToUpdates">
      <Button variant="plain" slot="toggle">
        <provet-icon
          name="navigation-notifications"
          size="m"
          class="n-color-text-on-accent"
        />
        <div
          class="n-counter"
          aria-hidden="true"
          style="position: absolute; min-inline-size: 10px"
        >
          3
        </div>
      </Button>
      <h2 slot="header" class="n-typescale-l">Notifications</h2>
      <provet-message unread highlight>
        <span> New product update: New report type supported! </span>
      </provet-message>
      <provet-message unread>
        <span>New product update: Patients category added!</span>
      </provet-message>
      <provet-message unread>
        <span>You successfully signed up to Provet Cloud.</span>
      </provet-message>
      <provet-dropdown-item
        >See all notifications<provet-icon
          slot="end"
          name="arrow-right-long"
        ></provet-icon
      ></provet-dropdown-item>
    </provet-dropdown>
    <provet-dropdown slot="end" v-else>
      <Button variant="plain" slot="toggle">
        <provet-icon
          name="navigation-notifications"
          size="m"
          class="n-color-text-on-accent"
        />
        <div
          class="n-counter"
          aria-hidden="true"
          style="position: absolute; min-inline-size: 10px"
        >
          1
        </div>
      </Button>
      <h2 slot="header" class="n-typescale-l">Notifications</h2>
      <provet-message unread highlight>
        You successfully signed up to Provet Cloud.
      </provet-message>
      <provet-dropdown-item
        >See all notifications<provet-icon
          slot="end"
          name="arrow-right-long"
        ></provet-icon
      ></provet-dropdown-item>
    </provet-dropdown>
    <provet-dropdown slot="end">
      <Button variant="plain" slot="toggle">
        <provet-stack direction="horizontal">
          <provet-avatar></provet-avatar
          ><span class="n-color-text-on-accent">{{ user?.username }}</span>
        </provet-stack>
      </Button>
      <provet-dropdown-group>
        <provet-dropdown-item href="#">
          <provet-icon slot="start" name="user-single"></provet-icon>
          View profile
        </provet-dropdown-item>
        <provet-dropdown-item>
          <provet-icon slot="start" name="navigation-settings"></provet-icon>
          Settings
        </provet-dropdown-item>
        <provet-dropdown-item> Help And Support </provet-dropdown-item>
      </provet-dropdown-group>
      <provet-dropdown-item @click="logout">
        Sign out
        <provet-icon slot="end" name="interface-logout"></provet-icon>
      </provet-dropdown-item>
    </provet-dropdown>
  </provet-top-bar>
</template>
