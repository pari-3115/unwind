
import { Plot, SiteConfig, Booking, User } from './types';
import { MOCK_TRIPS, INITIAL_PLOTS } from './constants';

/**
 * CLIENT-SIDE ONLY STORAGE SERVICE
 * This service manages data in the browser's LocalStorage.
 * No backend server is required, making it Vercel-ready.
 */
const STORAGE_KEYS = {
  PLOTS: 'unwind_plots_data',
  CONFIG: 'unwind_site_config',
  SAVED: 'unwind_user_saved_ids'
};

const getLocal = (key: string) => localStorage.getItem(key);
const setLocal = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));

export const api = {
  async getPlots(): Promise<Plot[]> {
    const cached = getLocal(STORAGE_KEYS.PLOTS);
    if (!cached) {
      setLocal(STORAGE_KEYS.PLOTS, INITIAL_PLOTS);
      return INITIAL_PLOTS;
    }
    return JSON.parse(cached);
  },

  async savePlot(plot: Plot): Promise<Plot> {
    const plots = await this.getPlots();
    const index = plots.findIndex(p => p.id === plot.id);
    if (index > -1) plots[index] = plot;
    else plots.push(plot);
    setLocal(STORAGE_KEYS.PLOTS, plots);
    return plot;
  },

  async deletePlot(plotId: string): Promise<void> {
    const plots = await this.getPlots();
    const filtered = plots.filter(p => p.id !== plotId);
    setLocal(STORAGE_KEYS.PLOTS, filtered);
  },

  async getConfig(): Promise<SiteConfig> {
    const defaultConfig: SiteConfig = {
      primaryColor: '#4f46e5',
      heroImageUrl: 'https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/best-places-to-visit-in-india.jpg',
      logoUrl: undefined,
      siteName: 'UnWind',
      tagline: 'Discover Incredible Places, Rest with confidence.',
      privacyContent: 'Your journey privacy is our top priority. We only reveal sanctuary coordinates after a booking is confirmed.',
      safetyContent: 'Every UnWind plot undergoes a mandatory 15-point inspection specialized for diverse terrains.',
      supportContent: 'Our support team is available 24/7 for active bookings at support@unwind.com.',
      aboutContent: 'UnWind was founded to provide safe, private, and reliable places to rest for RV travellers.',
      contactContent: 'Reach us at contact@unwind.com for partnership or support inquiries.'
    };

    const cached = getLocal(STORAGE_KEYS.CONFIG);
    return cached ? JSON.parse(cached) : defaultConfig;
  },

  async updateConfig(config: SiteConfig): Promise<SiteConfig> {
    setLocal(STORAGE_KEYS.CONFIG, config);
    return config;
  },

  async getSavedPlotIds(): Promise<string[]> {
    const cached = getLocal(STORAGE_KEYS.SAVED);
    return cached ? JSON.parse(cached) : [];
  },

  async toggleSavedPlot(plotId: string): Promise<string[]> {
    const saved = await this.getSavedPlotIds();
    const index = saved.indexOf(plotId);
    if (index > -1) saved.splice(index, 1);
    else saved.push(plotId);
    setLocal(STORAGE_KEYS.SAVED, saved);
    return saved;
  },

  async getTrips(): Promise<Booking[]> {
    return MOCK_TRIPS; 
  }
};
