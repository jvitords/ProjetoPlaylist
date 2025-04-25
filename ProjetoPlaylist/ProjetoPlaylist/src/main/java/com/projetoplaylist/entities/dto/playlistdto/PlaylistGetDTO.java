package com.projetoplaylist.entities.dto.playlistdto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.projetoplaylist.entities.Music;
import com.projetoplaylist.entities.Playlist;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaylistGetDTO implements Serializable { // class responsável por retornar os dados do GET

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String genre;
	private Integer quantityMusic;
	
	private Set<Music> listMusics = new HashSet();

	public PlaylistGetDTO() {
	}

	public PlaylistGetDTO(Playlist playlist) {
		this.id = playlist.getId();
		this.name = playlist.getName();
		this.genre = playlist.getGenre();
		this.quantityMusic = playlist.getQuantityMusic();
		this.listMusics = playlist.getListMusics();
	}

}
