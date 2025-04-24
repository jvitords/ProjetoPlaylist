package com.projetoplaylist.entities.dto.musicdto;

import java.io.Serializable;

import com.projetoplaylist.entities.Music;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MusicDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotBlank(message = "O nome da música não pode estar em branco")
	private String name;

	@NotBlank(message = "O artista não pode estar em branco")
	private String artist;

	public MusicDTO() {}

	public MusicDTO(Music musicDTO) {
		this.name = musicDTO.getName();
		this.artist = musicDTO.getArtist();
	}
}
