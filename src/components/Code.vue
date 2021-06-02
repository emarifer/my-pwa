<template>    
  <div class="mx-4">
    <pre>
        <code class="javascript rounded-lg" id="code">
            {{ code }}              
        </code>
    </pre>
  </div>
</template>

<style>
  #code {
    background-color: rgba(40, 40, 40, 0.7);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  }
</style>

<script>
    import '../assets/css/monokai-sublime.min.css'
    import hljs from '../assets/js/highlight.min.js'
    
    export default {
      name: 'Code',
      props: {
          code: String
      },
      mounted() {
        hljs.highlightAll()
      },
    }
</script>