<template>
    <div :class="cls">
        <slot/>
    </div>
</template>

<script>
  import {validateStatus} from '@/libs/uiComponentPropValidation.js';

  export default {
    name      : 'Icon',
    components: {},
    props     : {
      status: {
        type     : String,
        default  : 'info',
        validator: validateStatus
      }
    },
    computed  : {
      cls() {
        return ['badge', this.status].join(' ');
      }
    }
  };
</script>