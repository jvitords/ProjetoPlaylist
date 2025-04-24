package com.projetoplaylist.service.exception;

public class NotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	private String mensagem;
	
	public NotFoundException(String mensagem) {
		this.mensagem = mensagem;
	}
}
