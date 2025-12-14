export const featuresConfig = {
    enableBlog: true,               
    enableProjects: true,           
    enableExperience: true,         
    enablePapers: true,             
    enableBooks: true,              
    enableAnime: true,              
    enableHobbies: true,            
    enableUses: true,               
    enableMusicPlayer: true,        
    enableTerminal: true,           
    enableMatrixRain: true,         
    enableGitHubStats: true,        
    enableWeatherWidget: false,     
    enableCommandMenu: true,        
    enableBackToTop: true,          
    enableThemeToggle: true,        
    enableSearch: true,             
    enableComments: false,          
    enableNewsletter: false,        
    enableAnalytics: false,         
} as const;
export type FeaturesConfig = typeof featuresConfig;
export function isFeatureEnabled(feature: keyof FeaturesConfig): boolean {
    return featuresConfig[feature];
}
