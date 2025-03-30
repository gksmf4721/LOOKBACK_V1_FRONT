
export const useCommonStore = defineStore
('common', () => {
    const handleImageError = (url: string,event: Event) => {
        const target = event.target as HTMLImageElement;
        target.src = new URL(url, import.meta.url).href;
    };

    return {
        handleImageError
    };
});