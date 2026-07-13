import { Form } from "@/screens/form";
import { Result } from "@/screens/result";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const Root = createNativeStackNavigator({
  screens: {
    Form: {
      screen: Form,
      options: { title: "AI Brief Generator" },
    },
    Result: {
      screen: Result,
      options: { title: "Campaign Brief" },
    },
  },
  screenOptions: {
    headerBackButtonDisplayMode: "minimal",
  },
});
