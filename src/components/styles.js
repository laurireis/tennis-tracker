import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#fa5aca'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  error: {
    marginBottom: 20,
    color: 'red',
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  manageGame: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#4d048d',
    margin: 4,
    borderRadius: 4,
  },
  playedGame: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
    width: '100%',
  }
})
