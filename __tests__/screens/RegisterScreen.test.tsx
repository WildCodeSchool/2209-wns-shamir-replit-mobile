import { render, screen } from "@testing-library/react-native";
import RegisterScreen from "../../src/screens/RegisterScreen";

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

describe("RegisterScreen", () => {
  describe("Rendering", () => {
    let props: any;

    beforeEach(() => {
      props = createTestProps({});
    });

    it("should render a <View />", async () => {
      render(<RegisterScreen {...props} />);
      const title = await screen.findByText('Inscription');
      expect(title).toBeTruthy();
    });
  });
});
// describe('truth', () => {
//   it('is true', () => {
//     expect(true).toEqual(true);
//   });
// });
