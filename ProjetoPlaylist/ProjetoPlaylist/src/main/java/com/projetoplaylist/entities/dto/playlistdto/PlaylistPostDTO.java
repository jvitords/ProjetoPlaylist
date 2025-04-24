package com.projetoplaylist.entities.dto.playlistdto;

import java.io.Serializable;

import com.projetoplaylist.entities.Playlist;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaylistPostDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@NotBlank(message = "O nome da música não pode estar em branco")
	private String name;
	@NotBlank(message = "O nome da música não pode estar em branco")
	private String genre;

	public PlaylistPostDTO() {
	}

	public PlaylistPostDTO(Playlist playlist) {
		this.name = playlist.getName();
		this.genre = playlist.getGenre();
	}
}
