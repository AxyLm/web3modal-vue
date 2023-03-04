import { defineStore } from 'pinia';

interface AppSettingState {
  colorShema: string;
}

export const AppSetting = defineStore('AppSetting', {
  state: (): AppSettingState => {
    return {
      colorShema: 'dark',
    };
  },
  getters: {
    colorShema: (state) => state.colorShema,
  },
});
