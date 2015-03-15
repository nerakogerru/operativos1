
import javax.swing.*;
import java.awt.Color;
import java.awt.event.*;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class Shell extends JFrame{
	
	//elementos gráficos
	JTextField tComando;
	JButton bEjecutar;
        JButton borrar;
	JTextArea tResultado;
	JScrollPane sPane;

	//oyente de click de botón
	ActionListener alEjecutar;
        ActionListener borrarclick;

	public Shell(){
		setSize(700,600);
		setTitle(System.getProperty("os.name"));
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	private void graficos(){
		getContentPane().setLayout(null);
		//cuadro de texto
		tComando = new JTextField();
		tComando.setBounds(50,50,250,30);
		add(tComando);
		//botón para ejecutar comando
		bEjecutar = new JButton("Ejecutar");
		bEjecutar.setBounds(350,50,150,30);
		add(bEjecutar);
		bEjecutar.addActionListener(alEjecutar);
                borrar = new JButton("Borrar");
                borrar.setBounds(500,50,150,30);
                add(borrar);
                borrar.addActionListener(borrarclick);

		//área de texto
		tResultado = new JTextArea();
		tResultado.setBounds(50,130,600,370);
		tResultado.setBackground(Color.BLACK);
		tResultado.setForeground(Color.GREEN);
		//scroll pane
		sPane = new JScrollPane(tResultado);
		sPane.setBounds(50,120,500,400);
		add(sPane);
		//
		setVisible(true);
	}

	private void acciones(){
		alEjecutar = new ActionListener(){
			public void actionPerformed(ActionEvent e){
				ejecutar();
			}
		};
                borrarclick = new ActionListener(){
			public void actionPerformed(ActionEvent f){
				borrar();
			}
		};
	}

	private void ejecutar(){

		Runtime cmd=Runtime.getRuntime();

		try{
                    Process proc=cmd.exec(tComando.getText());
                    BufferedReader read= new BufferedReader(new InputStreamReader(proc.getInputStream()));
                    tResultado.setText("");
                    String linea;
                    while((linea=read.readLine())!=null){
                        tResultado.append(linea+"\n");
                    }
                
                }
                catch(Exception e){
                    JOptionPane.showMessageDialog(this, e.getMessage());
                }


	}
        
        private void borrar(){
                   tResultado.setText("");
	}

	public static void main(String args[]){
		Shell ventana = new Shell();
		ventana.acciones();	
		ventana.graficos();	
	}

}
