import {
  createNavigationContainerRef,
  CommonActions,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(routeName: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
}
