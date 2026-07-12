import { Form } from "@/screens/form";
import { Result } from "@/screens/result";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const Root = createNativeStackNavigator({
  screens: {
    Form,
    Result,
  },
});
