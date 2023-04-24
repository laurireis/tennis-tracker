import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fa5aca',
    fontFamily: 'monospace',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 3,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
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
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
    width: '100%',
  },
  gameGrid: {
    flex: 0,
    marginHorizontal: 'auto',
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  gameGridRow: {
    flexDirection: 'row',
  },
  '1col': {
    backgroundColor: 'lightgray',
    flex: 1,
    margin: 1,
    padding: 8,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logIn: {
    fontSize: 20,
    fontFamily: 'monospace',
  }
})
