<template>
  <div class="footer">

  </div>
</template>

<script>
  import { fixedEncodeURIComponent } from '~/utilities'

  export default {
    name: 'Footer',
    data () {
      return {
        src: this.$store.state.siteUrl,
        text: 'Savemystory ‒ безопасное сохранение истории VK',
        tags: [
          'vk',
          'save',
          'story',
          'secure'
        ],
        privacyUrl: '/privacy-policy'
      }
    },
    computed: {
      url: function () {
        return `https://platform.twitter.com/widgets/tweet_button.html?` +
          `url=${fixedEncodeURIComponent(this.src)}` +
          `&related=twitterapi%2Ctwitter` +
          `&text=${fixedEncodeURIComponent(this.text)}&` +
          `hashtags=${fixedEncodeURIComponent(this.tags.join(','))}`
      },
      tgUrl: function () {
        return `javascript:window.open('https://t.me/share/url?url=${fixedEncodeURIComponent(this.src)}', '_blank')`
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/mixins/_breackpoints.scss";

  $name: 'footer';

  .footer {
    display: grid;
    grid-template: auto / 1fr 1fr;
    width: 100%;
    padding: map_get($spacers, 2) map_get($spacers, 5);
    color: $invert-color;
    background: $accent-color;

    @include media-breakpoint-down(md) {
      grid-template: auto auto / 1fr;
    }

    @include media-breakpoint-down(xs) {
      padding: map_get($spacers, 2) map_get($spacers, 3);
    }

    &__group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      @include media-breakpoint-down(sm) {
        justify-content: center;
      }
    }

    &__social {
      justify-self: start;

      @include media-breakpoint-down(md) {
        justify-self: center;
        padding-top: map_get($spacers, 2);
      }

      .#{$name}__item_compact {
        @include media-breakpoint-down(md) {
          margin-bottom: map_get($spacers, 2);
        }
      }
    }

    &__contacts {
      justify-self: end;

      @include media-breakpoint-down(md) {
        justify-self: center;
        padding-bottom: map_get($spacers, 2);
      }
    }

    &__item {
      display: flex;
      align-items: center;
      margin-right: map_get($spacers, 5);

      &:last-child {
        margin-right: 0;
      }
    }

    &__item_compact {
      display: flex;
      align-items: center;
      margin-right: map_get($spacers, 3);

      &:last-child {
        margin-right: 0;
      }
    }

    &__icon-link {
      display: inline-block;
    }

    &__telegram {
      margin-bottom: 6px;
      transform: translateY(3px);
    }

    &__facebook {
      height: 26px;
      transform: translateY(3px);
    }

    &__twitter {
      transform: translateY(3px);
      border: 0;
      overflow: hidden;
    }
  }
</style>
