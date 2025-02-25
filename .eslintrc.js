module.exports = {
    extends: [
        'plugin:vue/vue3-recommended',
        '@vue/prettier'
    ],
    rules: {
        'vue/component-tags-order': [
            'error',
            {
                order: ['template', 'script', 'style']
            }
        ]
    }
}
