import 'package:flutter/material.dart';
import 'package:tutorial/utilities/my_button.dart';

class DialogBox extends StatelessWidget {

  final controller;
  VoidCallback onSave;
  VoidCallback onCancel;

  DialogBox({
    super.key, 
    required this.controller,
    required this.onSave,
    required this.onCancel
  });

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: const Color(0XFFF8F4EC),
      content: SizedBox(
        height: 120,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              TextField(
                controller: controller,
                decoration: const InputDecoration(
                  hintText: "Adicione uma tarefa")
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  MyButton(text: "Salvar", onPressed: onSave),
                  const SizedBox(width: 8),
                  MyButton(text: "Cancelar", onPressed: onCancel),
                ]
              )
            ],
          ),
        )
      ),
    );
  }
}