<template>
    <div class="draft-lobby">
        <draft-board />
    </div>
</template>

<script>
import DraftBoard from '@/components/DraftBoard.vue';

export default {
    name: 'draft-lobby',
    components: {
        DraftBoard
    }
}
</script>
