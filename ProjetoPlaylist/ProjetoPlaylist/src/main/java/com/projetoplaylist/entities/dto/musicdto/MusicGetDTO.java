package com.projetoplaylist.entities.dto.musicdto;

import java.io.Serializable;

import com.projetoplaylist.entities.Music;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MusicGetDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String artist;

	public MusicGetDTO() {}

	public MusicGetDTO(Music musicDTO) {
		this.id = musicDTO.getId();
		this.name = musicDTO.getName();
		this.artist = musicDTO.getArtist();
	}
}
