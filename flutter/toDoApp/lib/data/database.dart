import 'package:hive/hive.dart';

class ToDoDatabase{
  List toDoList = [];

  final _myBox = Hive.box('myBox');

  void CreateInitialData(){
    toDoList = [
      ["Ir no mercado", false],
      ["Pagar conta de luz", false]
    ];
  }

  void loadData(){
    toDoList = _myBox.get("TODOLIST");
  }

  void updateDatabase(){
    _myBox.put("TODOLIST", toDoList);
  }
}